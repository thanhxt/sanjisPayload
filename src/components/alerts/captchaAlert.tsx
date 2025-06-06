import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function CaptchaAlert() {
    return (
        <Alert variant="destructive" className="bg-black text-white">
            <AlertCircleIcon className="w-4 h-4" />
            <AlertTitle>Captcha-Fehler</AlertTitle>
            <AlertDescription>
                Bitte verifizieren Sie die Captcha-Eingabe
            </AlertDescription>
        </Alert>
    )
}