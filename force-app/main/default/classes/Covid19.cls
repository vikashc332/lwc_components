/*
public class HelloWorld {
    private String greeting = 'Hello World';
    // public variable
    public String publicGreeting = 'My public greeting var';

    /*
     * Generic method to print any message
     * */
   // public void printMessage(String msg) {
      //  System.debug(msg);
   // }

    /*
     * This method accepts a dayNumber and
     * returns the name of the day
     * */
  /*  public String getDay(Integer dayNumber) {
        String dayString = '';

        switch on dayNumber {
            when 0 {
                dayString = 'Sunday';
            }
            when 1 {
                dayString = 'Monday';
            }
            when 2 {
                dayString = 'Tuesday';
            }
            when 3 {
                dayString = 'Wednesday';
            }
            when 4 {
                dayString = 'Thursday';
            }
            when 5 {
                dayString = 'Friday';
            }
            when 6 {
                dayString = 'Saturday';
            }
            when else {
                dayString = 'Invalid day number';
            }
        }

        return dayString;
    }*/

    /*
     * This method accepts a day abbreviation and
     * returns the name of the day
     * */
    /* public String getDay(String dayAbbreviation) {
        String dayString = '';

        switch on dayAbbreviation {
            when 'Sun' {
                dayString = 'Sunday';
            }
            when 'Mon' {
                dayString = 'Monday';
            }
            when 'Tue' {
                dayString = 'Tuesday';
            }
            when 'Wed' {
                dayString = 'Wednesday';
            }
            when 'Thu' {
                dayString = 'Thursday';
            }
            when 'Fri' {
                dayString = 'Friday';
            }
            when 'Sat' {
                dayString = 'Saturday';
            }
            when else {
                dayString = 'Invalid abbreviation';
            }
        }

        return dayString;
    }

    public void printPublicGreeting() {
        System.debug(publicGreeting);
    }
}*/


 public class Covid19 {
    public Integer recoveredInArea = 0;
    //static variable
    public static Integer recoveredInCountry = 0;
    
    Public Covid19(){
      System.debug('Constructor Called');
    }
 
 
    public void treatPatient(){
        recoveredInArea++;
        recoveredInCountry++;
    }
 
    // static method
    public static void printTreated(){
        System.debug('Recovered in country : '+recoveredInCountry);
    }
 
    //static block
    static {
 
    }
}