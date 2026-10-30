# run_tests.ps1 (v2 - uses curl.exe to avoid Invoke-WebRequest Expect header bug)
# Run from: c:\Users\Bhavesh\OneDrive\sem5\math-platform\test\

$BASE = "http://localhost:3000"
$LOG = ".\results.txt"
"" | Out-File $LOG -Encoding utf8

function Run-Test {
    param($id, $desc, $method, $endpoint, $bodyFile, $token)

    $url = "$BASE$endpoint"
    $args = @("-s", "-w", "`n__STATUS__%{http_code}", "-X", $method)

    if ($bodyFile) {
        $args += @("-H", "Content-Type: application/json", "-d", "@$bodyFile")
    }
    if ($token) {
        $args += @("-H", "Authorization: Bearer $token")
    }
    # suppress Expect header (fixes Node 22 / vercel dev incompatibility)
    $args += @("-H", "Expect:")

    $raw = & curl.exe @args $url 2>&1
    $parts = $raw -split "__STATUS__"
    $body = $parts[0].Trim()
    $status = if ($parts.Length -gt 1) { $parts[1].Trim() } else { "???" }

    $line = "[$id] $desc`n  Status  : $status`n  Response: $body`n"
    Write-Host $line
    $line | Out-File $LOG -Append -Encoding utf8

    return [PSCustomObject]@{ Status=$status; Body=$body }
}

Write-Host "`n====== MATH PLATFORM API TESTS ======`n"

# T1 - Register valid
$t1 = Run-Test "T1" "Register valid user" "POST" "/api/register" ".\t1_register.json" $null

# T2 - Register duplicate
$t2 = Run-Test "T2" "Register duplicate email" "POST" "/api/register" ".\t1_register.json" $null

# T3 - Login valid -> extract token
$t3 = Run-Test "T3" "Login valid credentials" "POST" "/api/login" ".\t3_login_valid.json" $null
try {
    $TOKEN = ($t3.Body | ConvertFrom-Json).token
    Write-Host "  >> Token extracted OK`n"
} catch {
    $TOKEN = $null
    Write-Host "  >> WARNING: No token extracted. Remaining tests may fail auth.`n"
}

# T4 - Login wrong password
$t4 = Run-Test "T4" "Login wrong password" "POST" "/api/login" ".\t4_login_wrong.json" $null

# T5 - Questions no token
$t5 = Run-Test "T5" "Fetch questions - no token" "GET" "/api/questions?topic=Percentages&difficulty=Easy" $null $null

# T6 - Questions with token
$t6 = Run-Test "T6" "Fetch questions - valid token" "GET" "/api/questions?topic=Percentages&difficulty=Easy" $null $TOKEN

# T8 - Submit 0/1 (fail)
$t8 = Run-Test "T8" "Submit quiz 0/1 correct (0%, same difficulty)" "POST" "/api/submit-quiz" ".\t8_submit_fail.json" $TOKEN

# T9 - Submit 1/1 (pass)
$t9 = Run-Test "T9" "Submit quiz 1/1 correct (100%, next difficulty)" "POST" "/api/submit-quiz" ".\t9_submit_pass.json" $TOKEN

# T10a - Formula first call
$t10a = Run-Test "T10a" "Formula card - first call (Gemini or cache)" "POST" "/api/formulas" ".\t10_formula.json" $TOKEN

# T10b - Formula second call (should be cached)
$t10b = Run-Test "T10b" "Formula card - second call (must be cached)" "POST" "/api/formulas" ".\t10_formula.json" $TOKEN

# T11 - Dashboard progress
$t11 = Run-Test "T11" "Dashboard progress and recommendation" "GET" "/api/progress" $null $TOKEN

Write-Host "`n====== ALL TESTS COMPLETE ======`n"
Write-Host "Results saved to: test\results.txt`n"
