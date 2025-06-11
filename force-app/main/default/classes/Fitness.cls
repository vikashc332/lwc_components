/**
 * Fitness class with helpfull methods
 * to calculate the human fitness
 * */
 

public class Fitness {
 
    /**
     * calculateBMI method
     * accept body weight(should be in kg)
     * and body height(should be in meter)
     * returns BMI value
     * */
    public static decimal calculateBMI(Decimal weight, Decimal height){
        Decimal result = weight / (height*height);
        return result;
    }
    /**
     * calculatePace method
     * accepts distance(in km)
     * and minutes
     * returns Pace in km/hr
     * */

    public static Decimal calculatePace(Decimal distance, Decimal minutes){
        Decimal hr = minutes/60;
        Decimal Pace = distance/hr;
        return Pace;
    }  
}