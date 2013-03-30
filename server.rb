#!/usr/bin/env ruby

require 'rack'

include Rack

Handler::Thin.run Builder.new {run Directory.new 'public/' }
