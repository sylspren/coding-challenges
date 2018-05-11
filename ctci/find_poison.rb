class PoisonSimulation
  def initialize
    @poison_index = (1000 * rand).floor
    puts "shh the poison is in bottle #{@poison_index}"
  end

  def simulate_test (indices)
    indices.include? @poison_index
  end
end

def find_poison
  poison_simulator = PoisonSimulation.new()
  testing_strips = []
  10.times do
    testing_strips.push []
  end
  for i in (1..1000)
    i.to_s(2).rjust(10, '0').split('').each_with_index do |bit, index|
      if bit == '1'
        testing_strips[index].push i
      end
    end
  end
  bit_representation = []
  10.times do |strip_index|
    bit_representation.push poison_simulator.simulate_test(testing_strips[strip_index]) ? '1':'0'
  end
  puts "found poison in #{bit_representation.join().to_i(2)}"
end

puts find_poison()
