function formatDuration(durationSeconds: number): string {
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor(durationSeconds / 60) % 60;

    return hours + "h " + minutes + "min";
}

export default formatDuration;
