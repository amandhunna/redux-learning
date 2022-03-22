## https://github.com/lerna/lerna#getting-started
- npx lerna init

- | /root -> | lerna add @aman/utils --scope=@aman/main
- | /root/utils | npm link
- | root/main   | npm link @aman/utils