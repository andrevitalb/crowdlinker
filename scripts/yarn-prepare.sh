#! /bin/bash

set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

HUSKY_LOCAL_SH="$DIR/../.git/hooks/husky.local.sh"
if [[ -f "$HUSKY_LOCAL_SH" ]]; then
  sed -i'' -E 's/cd \".+\"/cd \".\"/' "$HUSKY_LOCAL_SH";
fi
