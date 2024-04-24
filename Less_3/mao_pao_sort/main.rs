
// pub fn bubble_sort(arr: &mut [i32]) {
//     let len = arr.len();
//     for i in 0..len.saturating_sub(1) {
//         for j in 0..(len - 1 - i) {
//             if arr[j] > arr[j + 1] {
//                 arr.swap(j, j + 1);
//             }
//         }
//     }
// }
 

// fn main() {
//     println!("Hello, world!");
//     let mut nums = [2, 20, 10, 4, 55, 3, 5];
//     bubble_sort(&mut nums);
//     println!("after sorted : {:?}", nums);
// }


// 泛型函数
fn bubble_sort<T: std::cmp::PartialOrd>(arr: &mut [T]) {
    for i in 0..arr.len() - 1 {
        for j in 0..arr.len() - 1 - i {
            if arr[j] > arr[j + 1] {
                arr.swap(j, j + 1);
            }
        }
    }
}
 
fn main() {
    let mut nums = [40, 6, 8, 3, 2, 28];
    bubble_sort(&mut nums);
    println!("{:?}", nums); // 输出排序后的数组
 
    let mut chars = ['c', 'd', 'a', 'f', 'g'];
    bubble_sort(&mut chars);
    println!("{:?}", chars); // 输出排序后的字符数组
}