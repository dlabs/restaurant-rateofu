from random import randrange
from string import ascii_lowercase, ascii_uppercase, digits


ALL_CHARS_AND_DIGITS = ascii_lowercase + ascii_uppercase + digits

def generate_bearer_token(length=6):
    assert length > 6, 'parameter "length" must be 6 or higher'

    # generate random hash, with custom length
    len_all = len(ALL_CHARS_AND_DIGITS)
    return ''.join([ALL_CHARS_AND_DIGITS[randrange(0,len_all)] for _ in range(length)])
