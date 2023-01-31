<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NsfwController extends Controller
{
    public function index()
    {
        echo "<pre>: ";
        print_r( 'Nfsw Controller' );
        echo "</pre>";

    }
}
