# sort then interlace
def sort_into_intervals (arr)
  sorted = arr.sort()
  left = sorted[0...sorted.length/2]
  right = sorted[sorted.length/2..-1]
  res = []
  while not left.empty? && right.empty?
    unless left.empty?
      res.push(left.shift())
    end
    res.push(right.shift())
  end
  res
end

def swap_pairs_to_make_intervals(arr)
  for i in (0...arr.length - 1)
    unless (i % 2 === 0 && arr[i] > arr[i + 1]) || arr[i] < arr[i+1]
      swap = arr[i]
      arr[i] = arr[i + 1]
      arr[i + 1] = swap
    end
  end
  arr
end

p sort_into_intervals([5, 3, 1, 2, 3])

p swap_pairs_to_make_intervals([5,3,1,2,3])
