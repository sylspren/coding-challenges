# Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.
#
# Example:
#
# Input:
# [
#   1->4->5,
#   1->3->4,
#   2->6
# ]
# Output: 1->1->2->3->4->4->5->6


# Definition for singly-linked list.
class ListNode
    attr_accessor :val, :next
    def initialize(val)
        @val = val
        @next = nil
    end

    def to_s
      array = [@val]
      current = @next
      while current
        array.push current.val
        current = current.next
      end
      array.join('->')
    end
end

class MinHeap
  def initialize
    @nodes = []
  end

  def add(listNode)
    @nodes.push(listNode)
    currentIndex = [(@nodes.length - 2) / 2, 0].max
    while not self._checkInvariant(currentIndex)
      minChildIndex = self._getMinChildIndex(currentIndex)
      swap = @nodes[currentIndex]
      @nodes[currentIndex] = @nodes[minChildIndex]
      @nodes[minChildIndex] = swap
      currentIndex = [(currentIndex - 1) / 2, 0].max
    end
  end

  def _getMinChildIndex(index)
    leftIndex = 2 * index + 1
    rightIndex = 2 * index + 2
    if not @nodes[leftIndex]
      return rightIndex
    elsif not @nodes[rightIndex]
      return leftIndex
    else
      return @nodes[leftIndex].val < @nodes[rightIndex].val ? leftIndex : rightIndex
    end
  end

  def _checkInvariant(index)
    (not @nodes[2 * index + 1] or @nodes[index].val <= @nodes[2 * index + 1].val) and
      (not @nodes[2 * index + 2] or @nodes[index].val <= @nodes[2 * index + 2].val)
  end

  def pop
    ret = @nodes.shift()
    tail = @nodes.pop()
    if tail
      @nodes.unshift(tail)
    end
    currentIndex = 0
    while not self._checkInvariant(currentIndex)
      minChildIndex = self._getMinChildIndex(currentIndex)
      swap = @nodes[currentIndex]
      @nodes[currentIndex] = @nodes[minChildIndex]
      @nodes[minChildIndex] = swap
      currentIndex = minChildIndex
    end
    return ret
  end

  def empty?
    @nodes.empty?
  end
end

# @param {ListNode[]} lists
# @return {ListNode}
def merge_k_lists(lists)
  minHeap = MinHeap.new()
  lists.each { |l| minHeap.add(l) if l}

  head = nil
  current = nil
  while not minHeap.empty?
    nextNode = minHeap.pop()
    if nextNode.next
      minHeap.add(nextNode.next)
    end

    nextNode.next = nil
    if current
      current.next = nextNode
    else
      head = nextNode
    end
    current = nextNode
  end
  head
end

def listify(array)
  nextNode = nil
  current = nil
  array.reverse.each_with_index do |x, i|
    current = ListNode.new(x)
    current.next = nextNode
    nextNode = current
  end
  current
end


#   1->4->5,
#   1->3->4,
#   2->6
lists = []
# lists.push(listify([1, 4, 5]))
# lists.push(listify([1, 3, 4]))
# lists.push(listify([2, 6]))
lists.push(listify([]))

puts merge_k_lists(lists)
