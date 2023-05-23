function removePngOrJpgFromString(string: string): string{
    const words: string[] = string.split('.');
    words.pop();
    return words.join(',');
}

export default removePngOrJpgFromString;