import { BlockRenderer } from "./BlockRenderer";
import type { ColumnsBlockType } from "../../../payload-types";

const widthClasses: Record<string, string> = {
    oneThird: 'md:col-span-2',
    half: 'md:col-span-3',
    twoThirds: 'md:col-span-4',
    full: 'md:col-span-6',
};

/**
 * Renders nested blocks side by side on a 6-column grid.
 * Columns stack vertically on small screens.
 */
export function ColumnsBlock({ columns }: ColumnsBlockType) {
    if (!columns || columns.length === 0) return null;

    return (
        <div className="bg-black">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-0 items-stretch">
                {columns.map((column) => (
                    <div key={column.id} className={widthClasses[column.width] || 'md:col-span-3'}>
                        <BlockRenderer blocks={column.content ?? []} />
                    </div>
                ))}
            </div>
        </div>
    );
}
