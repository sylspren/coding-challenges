# Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0?
# Find all unique triplets in the array which gives the sum of zero.
#
# Note:
#
# The solution set must not contain duplicate triplets.
#
# Example:
#
# Given array nums = [-1, 0, 1, 2, -1, -4],
#
# A solution set is:
# [
#   [-1, 0, 1],
#   [-1, -1, 2]
# ]



# @param {Integer[]} nums
# @return {Integer[][]}
def three_sum(nums)
  counts_map = Hash.new(0)
  nums.each { |i| counts_map[i] += 1 }

  triplets = {}
  uniq_numbers = nums.uniq
  uniq_numbers.each_with_index do |a, i|
    counts_map[a] -= 1
    relevant_pairs = uniq_numbers[i...uniq_numbers.length].clone()
    unless i === 0 # optimization 3i === 0 iff i === 0
      relevant_pairs.delete(i)
    end

    while relevant_pairs.length > 0
      b = relevant_pairs.pop()
      next unless counts_map[b] > 0
      counts_map[b] -= 1
      expected = 0 - a - b
      if counts_map[expected] > 0
        triplets[[a, b, expected].sort.join(',')] = true
        relevant_pairs.delete(expected)
      end
      counts_map[b] += 1
    end
    counts_map[a] += 1
  end
  # waffled a bunch on this.
  # alternatively keeping a bit more state we can avoid a hash for uniqueness
  # eg - track pairs to check and remove from pair or
  # pretty much equivalently track lists of pair options per first position
  triplets.keys().map { |triplet| triplet.split(',').map(&:to_i) }
end

# p three_sum([0, 0, 0])
p three_sum([-1, 0, 1, 2, -1, -4])
