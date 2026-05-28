# Parse API JSON and extract user-facing APIs
$apiJson = Get-Content "c:\Users\10779\NuxtProject\api.json" -Raw | ConvertFrom-Json

$paths = $apiJson.paths.PSObject.Properties

$userApis = @()

foreach ($path in $paths) {
    $pathName = $path.Name
    $pathValue = $path.Value
    
    # Check if path contains "/api/v1/app/" (user-facing APIs)
    if ($pathName -match '/api/v1/app/') {
        $methods = $pathValue.PSObject.Properties
        foreach ($method in $methods) {
            $methodName = $method.Name.ToUpper()
            $methodValue = $method.Value
            $tags = $methodValue.tags
            
            $api = @{
                path = $pathName
                method = $methodName
                summary = $methodValue.summary
                tags = $tags
                operationId = $methodValue.operationId
            }
            
            $userApis += $api
        }
    }
}

$userApis | ConvertTo-Json -Depth 10