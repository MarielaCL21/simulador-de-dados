import random
import tkinter as tk
from tkinter import messagebox
import matplotlib.pyplot as plt
from collections import Counter

historial = []
sumas = []

def simular():
    global historial, sumas
    historial = []
    sumas = []

    dados = int(entry_dados.get())
    lanzamientos = int(entry_lanzamientos.get())

    for i in range(lanzamientos):
        tiro = [random.randint(1,6) for _ in range(dados)]
        suma = sum(tiro)

        historial.append(tiro)
        sumas.append(suma)

    contador = Counter(sumas)
    mas_comun = contador.most_common(1)[0]

    label_resultado.config(
        text=f"Suma más frecuente: {mas_comun[0]} ({mas_comun[1]} veces)"
    )

def ver_historial():
    texto = ""
    for i, tiro in enumerate(historial[:50]):  # mostrar primeros 50
        texto += f"{i+1}: {tiro} = {sum(tiro)}\n"

    messagebox.showinfo("Historial", texto)

def ver_histograma():
    plt.hist(sumas, bins=range(min(sumas), max(sumas)+2), edgecolor="black")
    plt.title("Histograma de sumas")
    plt.xlabel("Suma de los dados")
    plt.ylabel("Frecuencia")
    plt.show()

ventana = tk.Tk()
ventana.title("Simulador de Dados")

tk.Label(ventana, text="Cantidad de dados").pack()
entry_dados = tk.Entry(ventana)
entry_dados.pack()

tk.Label(ventana, text="Cantidad de lanzamientos").pack()
entry_lanzamientos = tk.Entry(ventana)
entry_lanzamientos.pack()

tk.Button(ventana, text="Simular", command=simular).pack(pady=5)
tk.Button(ventana, text="Ver Historial", command=ver_historial).pack(pady=5)
tk.Button(ventana, text="Ver Histograma", command=ver_histograma).pack(pady=5)

label_resultado = tk.Label(ventana, text="")
label_resultado.pack(pady=10)

ventana.mainloop()