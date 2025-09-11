const https = require('https');

// GitHub API configuration
const owner = 'deepaksmallcase';
const repo = 'test-release-please';
const tagName = 'v1.9.0-stag.0';
const releaseName = '1.9.0-stag.0';
const prerelease = true;

// You'll need to replace this with your actual GitHub token
const token = process.env.GITHUB_TOKEN || 'your-github-token-here';

const data = JSON.stringify({
  tag_name: tagName,
  name: releaseName,
  body: '## Changes\n\n- Staging release for testing\n- Includes latest fixes and features',
  prerelease: prerelease,
  draft: false
});

const options = {
  hostname: 'api.github.com',
  port: 443,
  path: `/repos/${owner}/${repo}/releases`,
  method: 'POST',
  headers: {
    'Authorization': `token ${token}`,
    'User-Agent': 'Node.js',
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 201) {
      console.log('✅ Prerelease created successfully!');
      console.log('Release URL:', JSON.parse(responseData).html_url);
    } else {
      console.error('❌ Failed to create prerelease');
      console.error('Status:', res.statusCode);
      console.error('Response:', responseData);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error:', error);
});

req.write(data);
req.end();
