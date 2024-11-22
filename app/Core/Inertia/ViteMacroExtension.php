<?php declare(strict_types=1);

namespace App\Inertia;

use Latte\Extension;
use Nette\Utils\Json;
use Tracy\Debugger;

class ViteMacroExtension extends Extension
{
    public function __construct(
        private string $manifestPath = __DIR__ . '/../../www/dist/manifest.json'
    ) {
        Debugger::log("ViteMacroExtension constructed with manifest path: $manifestPath");
    }

    public function getFilters(): array
    {
        return [
            'viteAsset' => fn(string $path): string => $this->resolveViteAsset($path),
        ];
    }

    private function resolveViteAsset(string $path): string
    {
        Debugger::log("Resolving asset for path: $path");
        
        $path = preg_replace('/^resources\//', '', $path);
        
        if (!file_exists($this->manifestPath)) {
            Debugger::log("Manifest not found, using development mode");
            return "http://localhost:5173/" . $path;
        }

        $manifestContent = file_get_contents($this->manifestPath);
        Debugger::log("Manifest content: $manifestContent");
        $manifest = Json::decode($manifestContent, Json::FORCE_ARRAY);
        
        $lookupPath = preg_replace('/^js\//', '', $path);
        
        if (isset($manifest[$lookupPath])) {
            $resolvedPath = $manifest[$lookupPath]['file'];
            Debugger::log("Found in manifest, resolved to: $resolvedPath");
            return $resolvedPath;
        }
       
        $lookupPath = 'js/' . $path;
        if (isset($manifest[$lookupPath])) {
            $resolvedPath = $manifest[$lookupPath]['file'];
            Debugger::log("Found in manifest with js/ prefix, resolved to: $resolvedPath");
            return $resolvedPath;
        }
        
        Debugger::log("Path not found in manifest, returning original: $path");
        return $path;
    }
}