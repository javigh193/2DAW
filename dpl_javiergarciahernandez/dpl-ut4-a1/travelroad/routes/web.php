<?php

// https://laravel.com/api/6.x/Illuminate/Support/Facades/DB.html
use Illuminate\Support\Facades\DB;

Route::get('/', function () {
  $wished = DB::select('select * from places where visited = false');
  $visited = DB::select('select * from places where visited = true');

  return view('travelroad', ['wished' => $wished, 'visited' => $visited]);
});

Route::get('/wished', function() {
  $wished = DB::select('select * from places where visited = false');
  
  return view('travelroad_wished', ['wished' => $wished]);
});

Route::get('/visited', function() {
  $visited = DB::select('select * from places where visited = true');
  return view('travelroad_visited', ['visited' => $visited]);
});
