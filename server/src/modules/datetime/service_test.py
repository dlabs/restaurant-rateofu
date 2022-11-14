from . import service


def test_now_with_tz():
    now = service.now()

    assert now.tzinfo is not None
