#!/usr/bin/env python3
import subprocess
import sys

def run(cmd):
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    print(result.stdout)
    if result.stderr:
        print(result.stderr, file=sys.stderr)
    return result.returncode

def main():
    commit_msg = " ".join(sys.argv[1:]) if len(sys.argv) > 1 else "Update site"
    
    print("Adding all changes...")
    if run("git add -A") != 0:
        sys.exit(1)
    
    print(f"\nCommitting with message: '{commit_msg}'")
    if run(f'git commit -m "{commit_msg}"') != 0:
        print("Nothing to commit or commit failed")
    
    print("\nPushing to GitHub...")
    if run("git push") != 0:
        sys.exit(1)
    
    print("\n✅ Deployed! Site will update at https://cristianalamos.github.io in 1-2 minutes")

if __name__ == "__main__":
    main()

