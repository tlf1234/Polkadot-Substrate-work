
pub fn bubble_sort(arr: &mut [i32]) {
    let len = arr.len();
    for i in 0..len.saturating_sub(1) {
        for j in 0..(len - 1 - i) {
            if arr[j] > arr[j + 1] {
                arr.swap(j, j + 1);
            }
        }
    }
}
 

fn main() {
    println!("Hello, world!");
    let mut nums = [2, 20, 10, 4, 55, 3, 5];
    bubble_sort(&mut nums);
    println!("after sorted : {:?}", nums);
}
