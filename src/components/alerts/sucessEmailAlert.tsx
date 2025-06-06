import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { CheckCircle2Icon } from "lucide-react";

export default function SucessEmailAlert() {
    return (
        <Alert variant="default" className="bg-black text-white">
            <CheckCircle2Icon className="w-4 h-4" />
            <AlertTitle>Nachricht erfolgreich gesendet</AlertTitle>
            <AlertDescription>
                Ihre Nachricht wurde erfolgreich gesendet
            </AlertDescription>
        </Alert>
    )
}