#!/bin/bash

PROJECT="yopy-platform"

echo "Creating YOPY project structure..."

mkdir -p $PROJECT

#######################################
# CORE BACKEND
#######################################

mkdir -p $PROJECT/{config,controllers,services,models,routes,middleware}

touch $PROJECT/config/app.php
touch $PROJECT/config/database.php
touch $PROJECT/routes/web.php
touch $PROJECT/routes/api.php

#######################################
# CONTROLLERS
#######################################

touch $PROJECT/controllers/AuthController.php
touch $PROJECT/controllers/ChildController.php
touch $PROJECT/controllers/ParentController.php
touch $PROJECT/controllers/AdminController.php
touch $PROJECT/controllers/GameController.php

#######################################
# SERVICES (BUSINESS LOGIC)
#######################################

mkdir -p $PROJECT/services

touch $PROJECT/services/AuthService.php
touch $PROJECT/services/GameService.php
touch $PROJECT/services/ScoreService.php
touch $PROJECT/services/ParentDashboardService.php
touch $PROJECT/services/ChildProfileService.php

#######################################
# MODELS
#######################################

mkdir -p $PROJECT/models

touch $PROJECT/models/UserModel.php
touch $PROJECT/models/ChildModel.php
touch $PROJECT/models/GameModel.php
touch $PROJECT/models/ScoreModel.php
touch $PROJECT/models/SessionModel.php

#######################################
# FRONTEND
#######################################

mkdir -p $PROJECT/public/{css,js,images}

mkdir -p $PROJECT/public/js/{games,ui,api}

touch $PROJECT/public/css/style.css
touch $PROJECT/public/css/dashboard.css
touch $PROJECT/public/css/game.css

touch $PROJECT/public/js/ui/main.js
touch $PROJECT/public/js/api/gameApi.js

#######################################
# CHILD AREA
#######################################

mkdir -p $PROJECT/views/child/{character-selection,game-menu,games}

touch $PROJECT/views/child/character-selection/choose-character.php
touch $PROJECT/views/child/game-menu/menu.php

touch $PROJECT/views/child/games/memory-game.php
touch $PROJECT/views/child/games/math-game.php
touch $PROJECT/views/child/games/puzzle-game.php

#######################################
# PARENT AREA
#######################################

mkdir -p $PROJECT/views/parent/dashboard

touch $PROJECT/views/parent/dashboard/index.php
touch $PROJECT/views/parent/dashboard/child-progress.php
touch $PROJECT/views/parent/dashboard/game-history.php
touch $PROJECT/views/parent/dashboard/settings.php

#######################################
# ADMIN AREA
#######################################

mkdir -p $PROJECT/views/admin

touch $PROJECT/views/admin/admin-dashboard.php
touch $PROJECT/views/admin/manage-users.php
touch $PROJECT/views/admin/manage-games.php
touch $PROJECT/views/admin/reports.php

#######################################
# AUTH PAGES
#######################################

mkdir -p $PROJECT/views/auth

touch $PROJECT/views/auth/login.php
touch $PROJECT/views/auth/register.php

#######################################
# LAYOUTS
#######################################

mkdir -p $PROJECT/views/layouts

touch $PROJECT/views/layouts/header.php
touch $PROJECT/views/layouts/footer.php
touch $PROJECT/views/layouts/main.php

#######################################
# GAME JAVASCRIPT
#######################################

touch $PROJECT/public/js/games/memoryGame.js
touch $PROJECT/public/js/games/mathGame.js
touch $PROJECT/public/js/games/puzzleGame.js

#######################################
# GAME PHP LOGIC
#######################################

mkdir -p $PROJECT/games/{memory,math,puzzle}

touch $PROJECT/games/memory/MemoryGame.php
touch $PROJECT/games/math/MathGame.php
touch $PROJECT/games/puzzle/PuzzleGame.php

#######################################
# DATABASE
#######################################

mkdir -p $PROJECT/database/{migrations,seeds}

touch $PROJECT/database/schema.sql
touch $PROJECT/database/migrations/init.sql
touch $PROJECT/database/seeds/sample_data.sql

#######################################
# OPTIONAL AI MODULE (PLACEHOLDER)
#######################################

mkdir -p $PROJECT/ai/{emotion,recommendation,analysis}

touch $PROJECT/ai/emotion/EmotionState.php
touch $PROJECT/ai/recommendation/GameRecommender.php
touch $PROJECT/ai/analysis/BehaviorAnalyzer.php

#######################################
# SECURITY
#######################################

mkdir -p $PROJECT/security/{auth,csrf,validation}

touch $PROJECT/security/auth/AuthManager.php
touch $PROJECT/security/csrf/CSRFMiddleware.php
touch $PROJECT/security/validation/InputValidator.php

#######################################
# STORAGE
#######################################

mkdir -p $PROJECT/storage/{logs,cache,sessions}

touch $PROJECT/storage/logs/app.log

#######################################
# DOCUMENTATION
#######################################

mkdir -p $PROJECT/docs

touch $PROJECT/docs/architecture.md
touch $PROJECT/docs/domain-model.md
touch $PROJECT/docs/overview.md

#######################################
# ENTRY POINT
#######################################

touch $PROJECT/index.php

echo "YOPY structure created successfully."