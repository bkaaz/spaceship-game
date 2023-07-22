export async function preloadImages(imgUrls: string[]) {
    const loadImagePromises = imgUrls.map((url) => {
        return new Promise<[string, HTMLImageElement]>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve([url, img]);
            img.onerror = reject;
            img.src = url;
        });
    });

    const results = await Promise.all(loadImagePromises);
    return results.reduce<Record<string, HTMLImageElement>>((acc, [url, img]) => ({
        ...acc,
        [url]: img
    }), {});
}
