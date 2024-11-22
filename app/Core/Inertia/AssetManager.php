<?php declare(strict_types=1);

namespace App\Inertia;

class AssetManager
{
    private string $manifestPath;
    private ?array $manifest = null;

    public function __construct(string $manifestPath)
    {
        $this->manifestPath = $manifestPath;
    }

    public function getVersion(): ?string
    {
        return filemtime($this->manifestPath) ?: null;
    }

    public function getManifest(): array
    {
        if ($this->manifest === null) {
            $content = file_get_contents($this->manifestPath);
            $this->manifest = json_decode($content, true) ?? [];
        }

        return $this->manifest;
    }

    public function resolveScript(string $entry): ?string
    {
        $manifest = $this->getManifest();
        return $manifest[$entry]['file'] ?? null;
    }
}