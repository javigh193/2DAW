<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Calculadora UT2-A1</title>
</head>
<body>
    <h1>Calculadora Dockerizada</h1>
    <form method="post" action="calculadora_res.php">
    <input type="text" name="operando1">
    <select name="operador">
    <option value="+">+</option>
    <option value="-">-</option>
    <option value="*">*</option>
    <option value="/">/</option>
    </select>
    <input type="text" name="operando2">
    <input type="submit" value="Calcular">
    </form>
    <img src='calculadora.png'>
</body>
</html>