@echo off
echo Building Closure App ...

node node_modules\google-closure-compiler\cli.js ^
  --compilation_level ADVANCED ^
  --dependency_mode PRUNE_LEGACY ^
  --js closure-library/closure/goog/base.js ^
  --js closure-library/closure/goog/**/*.js ^
  --js !closure-library/closure/goog/testing/**/*.js ^
  --js src/**.js ^
  --js !src/tests/**.js ^
  --entry_point goog:app.main ^
  --js_output_file dist/app.min.js

echo BUILD COMPLETE
pause
