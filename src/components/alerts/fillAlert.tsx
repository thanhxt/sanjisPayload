import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";
export default function FillAlert() {
    return (
        <Alert variant="destructive" className="bg-black text-white">
            <AlertCircleIcon className="w-4 h-4" />
            <AlertTitle>Bitte füllen Sie alle Felder aus</AlertTitle>
            <AlertDescription>
                Bitte füllen Sie alle Felder aus, um eine E-Mail zu senden
            </AlertDescription>
        </Alert>
    )
}