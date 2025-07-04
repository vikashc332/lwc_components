public class Friends {
    /*Pizza Rates:
1 slice - $8/slice
2-3 slice - $7/slice
>3 slice - $6/slice
 
Ross ordered - 3 slices
Chandler ordered - 1 slice
Joey ordered - 4 slices
*/
 
    //Create rate card with constants
    final Integer ONLY_ONE_SLICE = 8;
    final Integer UPTO_THREE_SLICES = 7;
    final Integer MORE_THAN_THREE_SLICES = 6;
 
    // this method accepts number slices
    // and returns the amount
    public Integer getBill(Integer numberOfSlices){
        Integer billAmount = numberOfSlices == 1 ? ONLY_ONE_SLICE*numberOfSlices :
(numberOfSlices <= 3 ? UPTO_THREE_SLICES*numberOfSlices :
MORE_THAN_THREE_SLICES*numberOfSlices);
        return billAmount;
    }
 
}