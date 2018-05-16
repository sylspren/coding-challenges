def count_bool_eval(expr, res)
  ##
  # this is close but double counts
  # considering the indices of the operators
  # 1 3 2 is the same as 3 1 2
  # expressions like 0&0&0&0 will be double counted
  # could spit out the actual parens and check against existing as a save
  ##
  #
  # base case
  # if expr.length === 3
  #   return eval(expr) === res ? 1 : 0
  # end
  #
  # some inner pair must be evaluated first. pick one
  # count = 0
  # for i in (0...expr.length / 2)
  #   operator_index = i * 2 + 1
  #   sub_result = eval(expr[operator_index - 1..operator_index + 1])
  #   new_subexpr = "#{expr[0...operator_index - 1]}#{sub_result}#{expr[operator_index + 2...expr.length]}"
  #   count += count_bool_eval(new_subexpr, res)
  # end


  # instead think about the parse tree
  # some operand must be the root
  if expr.length === 0 # just easier to do this than checking index bounds below
    return 0
  end

  if expr.length === 1
    return expr.to_i === res ? 1 : 0
  end

  count = 0
  for i in (0...expr.length / 2)
    operator_index = i * 2 + 1
    for pair in [[0, 0], [0, 1], [1, 0], [1,1]]
      if eval("#{pair[0]}#{expr[operator_index]}#{pair[1]}") === res
        # consider memoize
        count += count_bool_eval(expr[0...operator_index], pair[0]) *
          count_bool_eval(expr[operator_index+1...expr.length], pair[1])
      end
    end
  end
  return count
end

puts count_bool_eval("1^0", 1) # 1
puts count_bool_eval("1^0|0|1", 0) # 2
puts count_bool_eval("0&0&0&0", 0) # 5

puts count_bool_eval("0&0&0&1^1|0", 1)


