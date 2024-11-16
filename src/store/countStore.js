let count = 0; // Variable to store count
let subscribers = new Set(); // Set to store callback functions

const countStore = {
	read() {
		// Method to get the count, this is basically getSnapshot method.
		return count;
	},
	// Subscribe method adds the "callback" to the "subscribers" set, and
	// return a method to unsubscribe from the store.
	subscribe(callback) {
		subscribers.add(callback);
		return () => subscribers.delete(callback);
	},
	// Method to increment the count
	increment() {
		count++;
		subscribers.forEach((callback) => callback());
	},
	decrement() {
		count--;
		subscribers.forEach((callback) => callback());
	},
};

export default countStore;
