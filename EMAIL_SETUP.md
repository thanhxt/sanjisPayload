# Email Setup Guide für Sanjis Kitchen

## Problem: Emails werden nicht versendet

### 1. Environment Variables prüfen

Stelle sicher, dass in deiner `.env.local` Datei folgende Variablen gesetzt sind:

```env
EMAIL_FROM=deine-email@gmail.com
EMAIL_PASSWORD=dein-app-passwort
```

### 2. Gmail App-Passwort erstellen

**WICHTIG:** Du musst ein App-Passwort verwenden, nicht dein normales Gmail-Passwort!

1. Gehe zu deinem Google Account: https://myaccount.google.com/
2. Wähle "Sicherheit" im linken Menü
3. Unter "Bei Google anmelden" wähle "2-Schritt-Verifizierung" (falls nicht aktiviert, aktiviere es zuerst)
4. Scrolle runter zu "App-Passwörter"
5. Wähle "Mail" als App und "Andere (benutzerdefiniert)" als Gerät
6. Gib einen Namen ein (z.B. "Sanjis Kitchen App")
7. Kopiere das generierte 16-stellige Passwort
8. Verwende dieses Passwort als `EMAIL_PASSWORD` in deiner `.env.local`

### 3. Email-Konfiguration testen

Du kannst die Email-Konfiguration testen, indem du einen POST-Request an `/api/test-email` sendest:

```bash
curl -X POST http://localhost:3000/api/test-email
```

### 4. Häufige Probleme

#### Problem: "Invalid login"
- **Lösung:** Verwende ein App-Passwort, nicht dein normales Gmail-Passwort
- **Lösung:** Stelle sicher, dass 2-Faktor-Authentifizierung aktiviert ist

#### Problem: "Less secure app access"
- **Lösung:** Gmail erlaubt keine "weniger sicheren Apps" mehr. Verwende App-Passwörter.

#### Problem: "Connection timeout"
- **Lösung:** Prüfe deine Internetverbindung
- **Lösung:** Stelle sicher, dass keine Firewall den Port 587 blockiert

#### Problem: "Authentication failed"
- **Lösung:** Überprüfe, ob EMAIL_FROM und EMAIL_PASSWORD korrekt gesetzt sind
- **Lösung:** Stelle sicher, dass das App-Passwort korrekt kopiert wurde (ohne Leerzeichen)

### 5. Debugging

Die Email-Funktion gibt jetzt detaillierte Logs aus. Schaue in die Konsole für:

- `EMAIL_FROM: SET/NOT SET`
- `EMAIL_PASSWORD: SET/NOT SET`
- `Email server connection verified`
- `Email sent successfully: [messageId]`

### 6. Alternative Email-Anbieter

Falls Gmail nicht funktioniert, kannst du andere SMTP-Anbieter verwenden:

```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.your-provider.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  }
})
```

### 7. Test-Email senden

Nach der Konfiguration solltest du eine Test-Email an deine eigene Adresse erhalten, wenn du eine Bestellung abschließt.
