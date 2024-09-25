const TODO = 'todo';
export default {
    fetchData() {
        const data = JSON.parse(localStorage.getItem(TODO));
        if (!data) {
            return [];
        }
        return data;
    },
    saveData(data) {
        localStorage.setItem(TODO, JSON.stringify(data));
    }
};