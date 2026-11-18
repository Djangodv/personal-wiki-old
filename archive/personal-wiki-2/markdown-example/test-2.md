# Test 2

`Hello`

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marked Example</title>
    <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
</head>
<body>

<div id="content"></div>

<script>
  // Create a custom renderer
  const renderer = {
    heading(text, level) {
      const sanitizedText = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return `<h${level} id="${sanitizedText}">${text}</h${level}>`;
    }
  };

  // Use the custom renderer
  marked.use({ renderer });

  // Sample Markdown string
  const markdownString = `
# Heading One
## Heading Two
### Heading Three
`;


## Test 2

  // Parse the Markdown and inject it into the DOM
  document.getElementById('content').innerHTML = marked(markdownString);
</script>
</body>
</html>


## Test 5
