# Realizacja kluczy po płatności Tipply

Strona przygotowuje kod produktu. Zamówienia są sprawdzane i realizowane ręcznie przez administrację, tak jak rangi. Strona nie potwierdza płatności i nie wykonuje komend serwera.

| Kod produktu | Typ pluginu | Cena jednego klucza |
| --- | --- | --- |
| KLUCZ-ZWYKLA | zwykla | 5 PLN |
| KLUCZ-LEPSZA | lepsza | 10 PLN |
| KLUCZ-KOKS | koks | 20 PLN |

1. Potwierdź płatność po stronie Tipply. Sprawdź kod produktu, nick i kwotę. Sama wiadomość lub zrzut ekranu od kupującego nie potwierdza płatności.
2. Zapisz w rejestrze realizacji unikalne ID pozycji zamówienia, identyfikator płatności, nick, typ oraz liczbę kluczy. Dla pojedynczego klucza liczba wynosi `1`. Jednej płatności nie realizuj ponownie jako nowego zamówienia.
3. W konsoli survivala wykonaj:

```text
skrzynkiadmin dostawa <unikalne-ID-pozycji-zamówienia> <nick> <zwykla|lepsza|koks> <liczba>
```

4. Zapisz wynik realizacji. Dostawa obsługuje graczy offline.
5. Jeśli trzeba ponowić dostawę po błędzie lub niepewnym wyniku, użyj **dokładnie tego samego ID i tych samych parametrów**. Według kontraktu pluginu takie ponowienie nie dubluje kluczy. Nie generuj nowego ID przy ponowieniu i nie zmieniaj nicku, typu ani liczby pod istniejącym ID.

Każdy klucz oznacza jedną losową nagrodę. Zakup nie daje całego katalogu.
