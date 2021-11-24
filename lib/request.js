export const request = async (url) => {
    try {
        const json = await fetch(url);

        if (!json.ok) {
            const message = `An error has occured: ${json.status}`;
            throw new Error(message);
        }

        const data = await json.json();

        return data;
    } catch (error) {
        return [];
    }
}