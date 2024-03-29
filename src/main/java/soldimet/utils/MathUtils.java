package soldimet.utils;

public class MathUtils {

    public static Float roundFloat(Float number) {
        if (number != null) {
            return Math.round(number * 100.0) / Float.valueOf("100.0");
        }
        return new Float(0);
    }

    public static Integer roundFloatToInteger(Float number) {
        if (number != null) {
            return Math.round(number);
        }
        return new Integer(0);
    }

}
