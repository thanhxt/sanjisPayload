import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function CookieAlert() {
    return (
        <Alert variant="destructive" className="bg-black text-white">
            <AlertCircleIcon className="w-4 h-4" />
            <AlertTitle>Cookie-Zustimmung erforderlich</AlertTitle>
            <AlertDescription>
                Bitte akzeptieren Sie die Cookie-Zustimmung, um eine E-Mail zu senden
            </AlertDescription>
        </Alert>
    )
}