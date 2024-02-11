import csv

csv_file_path = 'system_info.csv'

def add_failure_warning_column():
    # Leer el CSV existente
    rows = []
    with open(csv_file_path, 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        fieldnames = reader.fieldnames
        for row in reader:
            # Evaluar la condición de cpu_percent y agregar la columna failure_warning
            cpu_percent = float(row['cpu_percent'])
            if cpu_percent < 60:
                row['failure_warning'] = '0'
            elif 60 <= cpu_percent <= 100:
                row['failure_warning'] = '1'
            rows.append(row)

    # Escribir los resultados en un nuevo CSV
    with open('system_info_with_warning.csv', 'w', newline='') as csvfile:
        fieldnames.append('failure_warning')
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

# Agregar la columna failure_warning al archivo CSV
add_failure_warning_column()
