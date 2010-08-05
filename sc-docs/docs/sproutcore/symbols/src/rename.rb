require 'fileutils'

string = "sproutcore-abbot_frameworks_sproutcore_"

file_names = Dir.glob("*#{string}*")

file_names.each do |file_name|
  new_name = file_name.gsub(/#{string}/, '')

  puts "moving #{file_name} to #{new_name}"
  system("mv #{file_name} #{new_name}")
end
