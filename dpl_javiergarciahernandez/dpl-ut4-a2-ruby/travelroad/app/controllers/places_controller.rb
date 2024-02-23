class PlacesController < ApplicationController
  def index
    @wished = Place.where(visited: false)
    @visited = Place.where(visited: true)
  end
end
