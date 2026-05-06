<?php

namespace App\Http\Controllers;

use OpenApi\Attributes as OA;

#[OA\Info(
    version: '1.0.0',
    description: 'Swagger OpenApi description for Click2Book Backend',
    title: 'Click2Book API Documentation',
)]
#[OA\Server(
    url: L5_SWAGGER_CONST_HOST,
    description: 'Backend API Server',
)]
abstract class Controller
{
    #[OA\Get(
        path: '/api/health',
        description: 'Health check endpoint',
        responses: [
            new OA\Response(response: 200, description: 'API is working')
        ]
    )]
    public function healthCheck()
    {
        return response()->json(['status' => 'ok']);
    }
}
