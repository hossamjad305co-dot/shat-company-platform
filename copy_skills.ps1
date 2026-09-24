$targetSkillsDir = "C:\SHAT_Company\shat-company-platform\.agents\skills"
$skillsToCopy = @(
    "C:\Category\Design & UI-UX\Visual Design & Aesthetics\frontend-design",
    "C:\Category\Design & UI-UX\Visual Design & Aesthetics\high-end-visual-design",
    "C:\Category\Design & UI-UX\Visual Design & Aesthetics\minimalist-ui",
    "C:\Category\Design & UI-UX\Visual Design & Aesthetics\theme-factory",
    "C:\Category\Design & UI-UX\Visual Design & Aesthetics\web-artifacts-builder",
    "C:\Category\Design & UI-UX\design-system",
    "C:\Category\Design & UI-UX\ui-ux-pro-max",
    "C:\Category\Languages & Translation\Technical & Legal Translation\bilingual-technical-and-legal-translation",
    "C:\Category\Scholarships & Education\Pedagogy & Curriculum Design\curriculum-knowledge-architecture-designer",
    "C:\Category\Scholarships & Education\Pedagogy & Curriculum Design\professional-development-session-designer",
    "C:\Category\Scholarships & Education\Pedagogy & Curriculum Design\scope-and-sequence-designer",
    "C:\Category\Software Engineering\Developer Utilities & Tools\landing-page",
    "C:\Category\Software Engineering\Developer Utilities & Tools\responsiveness-check",
    "C:\Category\Software Engineering\Testing & Quality Assurance\code-review-and-quality",
    "C:\Category\Software Engineering\Testing & Quality Assurance\debugging-and-error-recovery",
    "C:\Category\Software Engineering\Git & Workflows\git-workflow-and-versioning",
    "C:\Category\Business & Commerce\Strategy & Operations\strategy-document",
    "C:\Category\Finance & Accounting\audit-trail"
)

foreach ($skill in $skillsToCopy) {
    if (Test-Path $skill) {
        $name = Split-Path $skill -Leaf
        $dest = Join-Path $targetSkillsDir $name
        Write-Host "Copying $name -> $dest"
        Copy-Item -Path $skill -Destination $dest -Recurse -Force
    } else {
        Write-Warning "Not found: $skill"
    }
}

Write-Host "Done copying skills!"
Get-ChildItem $targetSkillsDir | Select-Object Name
