/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.cache = {};
  this.capacity = capacity;
  this.size = 0;
  this.head = null;
  this.tail = null;
  return this;
};


/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  var node = this.cache[key];
  if (node) {
    this._moveToTail(node);
    return node.value;
  }
  return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  var node = this.cache[key];
  if (node) {
    node.value = value;
  } else {
    node = {
      next: null,
      prev: null,
      value: value,
      key: key,
    }

    if (this.size === this.capacity && this.size > 0) {
      var nodeToRemove = this.head;
      this.head = nodeToRemove.next;
      if (this.head) {
        this.head.prev = null;
      }
      delete this.cache[nodeToRemove.key];
    } else {
      this.size += 1;
    }

    this.cache[key] = node;
  }

  if (this.size === 1) {
    this.head = node;
    this.tail = node;
  } else {
    this._moveToTail(node);
  }
};

LRUCache.prototype._moveToTail = function (node) {
  // move node to end
  if (this.tail !== node) {
    // rewire around node
    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }
    if (this.head === node) {
      this.head = node.next;
    }
    node.next = null;
    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
  }
}

LRUCache.prototype.print = function () {
  var node = this.head;
  while (node) {
    console.log(node);
    node = node.next;
  }
  console.log('');
}


// Your LRUCache object will be instantiated and called as such:
var obj = new LRUCache(1);
obj.put(1, 'a');
console.log(obj.get(1))
obj.put(1, 'a');
console.log(obj.get(1))
obj.put(2, 'b');
console.log(obj.get(1))
console.log(obj.get(2))
obj.put(3, 'c');
console.log(obj.get(1))
console.log(obj.get(2))
