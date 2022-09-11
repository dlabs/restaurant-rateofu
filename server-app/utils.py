from random import randrange
from string import ascii_lowercase, ascii_uppercase, digits


ALL_CHARS_AND_DIGITS = ascii_lowercase + ascii_uppercase + digits
LOWER_CHARS_AND_DIGITS = ascii_lowercase + digits
ORDER_STAGES = ('ordered', 'preparing', 'ready_to_serve', 'delivered')

def generate_bearer_token(length=6):
    assert length > 6, 'parameter "length" must be 6 or higher'

    # generate random hash, with custom length
    len_all = len(ALL_CHARS_AND_DIGITS)
    return ''.join([ALL_CHARS_AND_DIGITS[randrange(0,len_all)] for _ in range(length)])

def generate_id():
    len_lower = len(LOWER_CHARS_AND_DIGITS)
    parts = [
        ''.join([LOWER_CHARS_AND_DIGITS[randrange(0,len_lower)] for _ in range(8)]),
        ''.join([LOWER_CHARS_AND_DIGITS[randrange(0,len_lower)] for _ in range(4)]),
        ''.join([LOWER_CHARS_AND_DIGITS[randrange(0,len_lower)] for _ in range(4)]),
        ''.join([LOWER_CHARS_AND_DIGITS[randrange(0,len_lower)] for _ in range(4)]),
        ''.join([LOWER_CHARS_AND_DIGITS[randrange(0,len_lower)] for _ in range(12)])
    ]
    return '-'.join(parts)
