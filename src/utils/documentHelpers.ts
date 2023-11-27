/**
 * Formats a list of document contents into a single string.
 * 
 * @param documents - An array of document contents.
 * @param separator - An optional separator to use between documents.
 * @return A single string with all documents concatenated, separated by the separator.
 */
export function formatDocumentsAsString(documents: any, separator = '\n') {
    return documents.join(separator);
}