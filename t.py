# def grade(x, y):
#     try:
#         return x + y
#     except TypeError:
#         return "TypeError: String cannot be evaluated"
#     except NameError:
#         return "NameError: name is not defined"
#     except Exception as e:
#         return f"Exception: {e}"
#     finally:
#         print("Successfully evaluated")

# print(grade(1, 's'))
# print(grade(40, '10'))
# print(grade(40, 70))

def get_grade(score):
    match score:
        case score if 90 <= score <= 100:
            return "Grade A"
        case score if 70 <= score < 90:
            return "Grade B"
        case _:
            return "Invalid score"

# Test the function
print(get_grade(95))  # Output: Grade A
print(get_grade(85))  # Output: Grade B
print(get_grade(105)) # Output: Invalid score

