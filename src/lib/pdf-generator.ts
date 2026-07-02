import PDFDocument from 'pdfkit'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

export interface VoucherPdfData {
  customerName?: string
  voucherCode: string
  voucherValue: number
  currency: string
  expiresAt: string
}

export async function generateVoucherPdf(data: VoucherPdfData): Promise<Buffer> {
  const { customerName, voucherCode, voucherValue, currency, expiresAt } = data

  return new Promise<Buffer>(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 0, bottom: 0, left: 0, right: 0 }
      })

      const chunks: Buffer[] = []
      doc.on('data', (chunk) => chunks.push(chunk))
      doc.on('end', () => resolve(Buffer.concat(chunks)))
      doc.on('error', (err) => reject(err))

      // PDF Dimensions (A4 in points: 595.28 x 841.89)
      const w = 595.28
      const h = 841.89

      // Draw background of the page
      doc.rect(0, 0, w, h).fillColor('white').fill()

      // Layout constants
      const margin = 40
      const gap = 20
      const boxW = w - 2 * margin // 515.28

      const boxH1 = 230
      const boxH2 = 230
      const boxH3 = 260

      const y1 = 40
      const y2 = y1 + boxH1 + gap // 290
      const y3 = y2 + boxH2 + gap // 540

      // Formatter for voucher value
      const formattedVoucherValue = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: currency || 'EUR'
      }).format(voucherValue)

      // Get absolute paths for assets
      const publicPath = path.resolve(process.cwd(), 'public')
      const bg1Path = path.join(publicPath, 'Sanjis_Julio-18.jpg')
      const bg2Path = path.join(publicPath, 'Sanjis_Julio-36.jpg')
      const logoPath = path.join(publicPath, 'sanjislogo.svg')

      // --- SECTION 1: TOP BOX (RAW STEAK & LOGO) ---
      if (fs.existsSync(bg1Path)) {
        // Resize bg1 image to exactly fit the PDF box to optimize size and keep resolution high
        const bg1Buffer = await sharp(bg1Path)
          .resize(1030, 460, { fit: 'cover' })
          .toBuffer()
        doc.image(bg1Buffer, margin, y1, { width: boxW, height: boxH1 })
      } else {
        doc.rect(margin, y1, boxW, boxH1).fillColor('#1a1a1a').fill()
      }

      // Dark overlay
      doc.rect(margin, y1, boxW, boxH1).fillColor('black').fillOpacity(0.35).fill()
      doc.fillOpacity(1.0) // Reset opacity

      // Draw circle
      const cx = margin + boxW / 2
      const cy = y1 + boxH1 / 2 - 20
      const r = 50
      doc.circle(cx, cy, r).lineWidth(2).strokeColor('white').stroke()

      // Render inverted logo inside circle
      if (fs.existsSync(logoPath)) {
        const logoPng = await sharp(logoPath)
          .resize(70, 70)
          .negate({ alpha: false })
          .png()
          .toBuffer()
        doc.image(logoPng, cx - 35, cy - 35, { width: 70, height: 70 })
      }

      // Draw "Gutschein" text
      doc.font('Times-Roman')
        .fontSize(36)
        .fillColor('white')
        .text('Gutschein', margin, cy + 50, { align: 'center', width: boxW })

      // --- SECTION 2: MIDDLE BOX (FIRE & NAME) ---
      if (fs.existsSync(bg2Path)) {
        const bg2Buffer = await sharp(bg2Path)
          .resize(1030, 460, { fit: 'cover' })
          .toBuffer()
        doc.image(bg2Buffer, margin, y2, { width: boxW, height: boxH2 })
      } else {
        doc.rect(margin, y2, boxW, boxH2).fillColor('#2d0d03').fill()
      }

      // Black overlay
      doc.rect(margin, y2, boxW, boxH2).fillColor('black').fillOpacity(0.2).fill()
      doc.fillOpacity(1.0) // Reset opacity

      // Draw white rectangle for name
      const wBox = 380
      const hBox = 60
      const xBox = margin + (boxW - wBox) / 2
      const yBox = y2 + (boxH2 - hBox) / 2
      doc.rect(xBox, yBox, wBox, hBox).fillColor('white').fill()

      // Text inside white box
      const recipientName = customerName ? customerName.trim() : ''
      doc.font('Helvetica')
        .fontSize(16)
        .fillColor('#1a1a1a')
        .text(`Gutschein für: `, xBox + 20, yBox + 22, {
          width: wBox - 40,
          align: 'left'
        })

      // --- SECTION 3: BOTTOM BOX (GRAY BOX & DETAILS) ---
      doc.rect(margin, y3, boxW, boxH3).fillColor('#b5b7b9').fill()

      // Section Title
      const yTitle = y3 + 25
      doc.font('Times-Roman')
        .fontSize(26)
        .fillColor('#1a1a1a')
        .text('Gutschein', margin, yTitle, { align: 'center', width: boxW })

      // White value box
      const wValBox = 380
      const hValBox = 60
      const xValBox = margin + (boxW - wValBox) / 2
      const yValBox = yTitle + 40
      doc.rect(xValBox, yValBox, wValBox, hValBox).fillColor('white').fill()

      // Value text
      doc.font('Helvetica')
        .fontSize(16)
        .fillColor('#1a1a1a')
        .text('Im Wert von:  ', xValBox + 20, yValBox + 22, { continued: true })
        .font('Helvetica-Bold')
        .text(formattedVoucherValue)

      // Columns logic
      const yLine = y3 + 190
      const xCol1 = margin + 40
      const xCol1End = xCol1 + 190

      // Dotted code line
      doc.moveTo(xCol1, yLine)
        .lineTo(xCol1End, yLine)
        .dash(2, { space: 2 })
        .strokeColor('#4a4a4a')
        .lineWidth(0.8)
        .stroke()
      doc.undash()

      // Code text
      doc.font('Helvetica-Bold')
        .fontSize(12)
        .fillColor('#1a1a1a')
        .text(voucherCode, xCol1, yLine - 15, { width: 190, align: 'center' })

      // Code label
      doc.font('Helvetica')
        .fontSize(9)
        .fillColor('#4a4a4a')
        .text('Gutscheincode', xCol1, yLine + 5, { width: 190, align: 'center' })

      // Column 2
      const xCol2 = margin + boxW - 40 - 190
      const xCol2End = xCol2 + 190

      // Dotted date line
      doc.moveTo(xCol2, yLine)
        .lineTo(xCol2End, yLine)
        .dash(2, { space: 2 })
        .strokeColor('#4a4a4a')
        .lineWidth(0.8)
        .stroke()
      doc.undash()

      // Date text
      const dateStr = new Date().toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
      doc.font('Helvetica')
        .fontSize(11)
        .fillColor('#1a1a1a')
        .text(dateStr, xCol2, yLine - 15, { width: 190, align: 'center' })

      // Date label
      doc.font('Helvetica')
        .fontSize(9)
        .fillColor('#4a4a4a')
        .text('Ausstellungsdatum', xCol2, yLine + 5, { width: 190, align: 'center' })

      // End document
      doc.end()
    } catch (err) {
      reject(err)
    }
  })
}
