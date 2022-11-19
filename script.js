class LinkedList {
	constructor() {
		const values = [...arguments];

		if (values.length == 0)
			throw "LinkedList can't be called with no arguments!";

		const headNode = new Node(values[0]);
		this.head = headNode;
		this.tail = headNode;

		for (let i = 1; i < values.length; i++) {
			this.append(values[i]);
		}
	}

	append(value) {
		const node = new Node(value, null);

		this.tail.nextNode = node;
		this.tail = node;
	}

	prepend(value) {
		const node = new Node(value, this.head);
		this.head = node;
	}

	size() {
		let i = 1;
		let node = this.head;

		while (node.nextNode != null) {
			i++;
			node = node.nextNode;
		}

		return i;
	}

	head() {
		return this.head;
	}

	tail() {
		return this.tail;
	}

	at(index) {
		let node = this.head;

		for (let i = 0; i < index; i++) {
			node = node.nextNode;
			if (node == null) break;
		}

		return node;
	}

	// Non esegue il pop se la linkedList contiene un solo elemento (l'head)
	pop() {
		let node = this.head;
		let size = this.size();

		// let i=1; non permette di selezionare l'headNode nel caso
		// in cui la linkedlist abbia un solo elemento (l'headNode stesso)
		for (let i = 1; i < size - 1; i++) {
			node = node.nextNode;
		}

		node.nextNode = null;
		this.tail = node;
	}

	contains(value) {
		let node = this.head;
		let result = false;

		do {
			if (node.value == value) {
				result = true;
				break;
			}

			node = node.nextNode;
		} while (node.nextNode != null);

		if (node.value == value) result = true;

		return result;
	}

	find(value) {
		let node = this.head;
		let i = 0;

		do {
			if (node.value == value) {
				return i;
			}
			i++;
			node = node.nextNode;
		} while (node.nextNode != null);

		if (node.value == value) return i;

		return null;
	}

	toString() {
		let string = `( ${this.head.value} ) -> `;
		let node = this.head;

		while (node.nextNode != null) {
			string += `( ${node.nextNode.value} ) -> `;
			node = node.nextNode;
		}

		string += `null`;

		return string;
	}

	insertAt(value, index) {
		if (index == 0) {
			this.prepend(value);
			return;
		}

		if (index == this.size()) {
			this.append(value);
			return;
		}

		if (index > this.size()) {
			throw 'The index provided is bigger than the length of the linked list!';
			return;
		}
		if (index < 0) {
			throw "The index can't be negative!";
			return;
		}

		const prevNode = this.at(index - 1);
		const nextNode = this.at(index);

		const newNode = new Node(value, nextNode);
		prevNode.nextNode = newNode;
	}

	removeAt(index) {
		if (index > this.size()) {
			throw 'The index provided is bigger than the length of the linked list!';
			return;
		}
		if (index < 0) {
			throw "The index can't be negative!";
			return;
		}
		if (index == 0) {
			// Se la linkedList è formata da un solo elemento non si può
			// rimuovere l'headNode => ritorna
			if (!this.head.nextNode) return;

			this.head = this.head.nextNode;
		} else if (index == this.size() - 1) {
			this.pop();
			return;
		}

		this.at(index - 1).nextNode = this.at(index + 1);
	}
}

class Node {
	constructor(value = null, nextNode = null) {
		this.value = value;
		this.nextNode = nextNode;
	}
}
