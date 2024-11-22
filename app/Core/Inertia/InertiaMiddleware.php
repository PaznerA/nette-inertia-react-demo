<?php declare(strict_types=1);

namespace App\Inertia;

use Nette\Http\IRequest;
use Nette\Http\IResponse;
use App\Inertia\InertiaException;

class InertiaMiddleware
{
    private IRequest $request;
        private AssetManager $assetManager;

    public function __construct(
        IRequest $request,
        IResponse $response,
        AssetManager $assetManager
    ) {
        $this->request = $request;
        $this->assetManager = $assetManager;
    }

    public function process(callable $next): void
    {
        if ($this->request->getHeader('X-Inertia')) {
            $this->negotiateVersion();
        }

        $next();
    }

    private function negotiateVersion(): void
    {
        $version = $this->assetManager->getVersion();
        
        if ($version !== null) {
            $clientVersion = $this->request->getHeader('X-Inertia-Version');
            
            if ($clientVersion !== $version) {
                throw new InertiaException('Version mismatch', 409);
            }
        }
    }
}
